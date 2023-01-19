using System.Collections.Generic;
using NzbDrone.Core.Music;

namespace NzbDrone.Core.Notifications.Webhook
{
    public class WebhookArtist
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Disambiguation { get; set; }
        public string Path { get; set; }
        public string MBId { get; set; }
        public string Type { get; set; }
        public string Overview { get; set; }
        public List<string> Genres { get; set; }

        public WebhookArtist()
        {
        }

        public WebhookArtist(Artist artist)
        {
            Id = artist.Id;
            Name = artist.Name;
            Disambiguation = artist.Metadata.Value.Disambiguation;
            Path = artist.Path;
            Type = artist.Metadata.Value.Type;
            Overview = artist.Metadata.Value.Overview;
            Genres = artist.Metadata.Value.Genres;
            MBId = artist.Metadata.Value.ForeignArtistId;
        }
    }
}
