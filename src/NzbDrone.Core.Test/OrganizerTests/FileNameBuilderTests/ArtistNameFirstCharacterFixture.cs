using System.Linq;
using FizzWare.NBuilder;
using FluentAssertions;
using NUnit.Framework;
using NzbDrone.Core.Music;
using NzbDrone.Core.Organizer;
using NzbDrone.Core.Qualities;
using NzbDrone.Core.Test.Framework;

namespace NzbDrone.Core.Test.OrganizerTests.FileNameBuilderTests
{
    [TestFixture]
    public class ArtistNameFirstCharacterFixture : CoreTest<FileNameBuilder>
    {
        private Artist _artist;
        private NamingConfig _namingConfig;

        [SetUp]
        public void Setup()
        {
            _artist = Builder<Artist>
                    .CreateNew()
                    .Build();

            _namingConfig = NamingConfig.Default;
            _namingConfig.RenameTracks = true;

            Mocker.GetMock<INamingConfigService>()
                  .Setup(c => c.GetConfig()).Returns(_namingConfig);

            Mocker.GetMock<IQualityDefinitionService>()
                .Setup(v => v.Get(Moq.It.IsAny<Quality>()))
                .Returns<Quality>(v => Quality.DefaultQualityDefinitions.First(c => c.Quality == v));
        }

        [TestCase("The Mist", "M\\The Mist")]
        [TestCase("A", "A\\A")]
        [TestCase("30 Rock", "3\\30 Rock")]
        public void should_get_expected_folder_name_back(string title, string expected)
        {
            _artist.Name = title;
            _namingConfig.ArtistFolderFormat = "{Artist NameFirstCharacter}\\{Artist Name}";

            Subject.GetArtistFolder(_artist).Should().Be(expected);
        }

        [Test]
        public void should_be_able_to_use_lower_case_first_character()
        {
            _artist.Name = "Westworld";
            _namingConfig.ArtistFolderFormat = "{artist namefirstcharacter}\\{artist name}";

            Subject.GetArtistFolder(_artist).Should().Be("w\\westworld");
        }
    }
}
