import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Card from 'Components/Card';
import FieldSet from 'Components/FieldSet';
import Icon from 'Components/Icon';
import PageSectionContent from 'Components/Page/PageSectionContent';
import { icons, metadataProfileNames } from 'Helpers/Props';
import sortByProp from 'Utilities/Array/sortByProp';
import translate from 'Utilities/String/translate';
import EditMetadataProfileModalConnector from './EditMetadataProfileModalConnector';
import MetadataProfile from './MetadataProfile';
import styles from './MetadataProfiles.css';

class MetadataProfiles extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isMetadataProfileModalOpen: false
    };
  }

  //
  // Listeners

  onCloneMetadataProfilePress = (id) => {
    this.props.onCloneMetadataProfilePress(id);
    this.setState({ isMetadataProfileModalOpen: true });
  };

  onEditMetadataProfilePress = () => {
    this.setState({ isMetadataProfileModalOpen: true });
  };

  onModalClose = () => {
    this.setState({ isMetadataProfileModalOpen: false });
  };

  //
  // Render

  render() {
    const {
      items,
      isDeleting,
      onConfirmDeleteMetadataProfile,
      ...otherProps
    } = this.props;

    return (
      <FieldSet legend={translate('MetadataProfiles')}>
        <PageSectionContent
          errorMessage={translate('UnableToLoadMetadataProfiles')}
          {...otherProps}
        >
          <div className={styles.metadataProfiles}>
            {
              items
                .filter((item) => item.name !== metadataProfileNames.NONE)
                .sort(sortByProp('name'))
                .map((item) => {
                  return (
                    <MetadataProfile
                      key={item.id}
                      {...item}
                      isDeleting={isDeleting}
                      onConfirmDeleteMetadataProfile={onConfirmDeleteMetadataProfile}
                      onCloneMetadataProfilePress={this.onCloneMetadataProfilePress}
                    />
                  );
                })
            }

            <Card
              className={styles.addMetadataProfile}
              onPress={this.onEditMetadataProfilePress}
            >
              <div className={styles.center}>
                <Icon
                  name={icons.ADD}
                  size={45}
                />
              </div>
            </Card>
          </div>

          <EditMetadataProfileModalConnector
            isOpen={this.state.isMetadataProfileModalOpen}
            onModalClose={this.onModalClose}
          />
        </PageSectionContent>
      </FieldSet>
    );
  }
}

MetadataProfiles.propTypes = {
  advancedSettings: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  isDeleting: PropTypes.bool.isRequired,
  onConfirmDeleteMetadataProfile: PropTypes.func.isRequired,
  onCloneMetadataProfilePress: PropTypes.func.isRequired
};

export default MetadataProfiles;
