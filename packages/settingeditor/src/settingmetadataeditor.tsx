import { MetadataEditor } from '@jupyterlab/metadata';
import { ISettingRegistry } from '@jupyterlab/settingregistry';

export class SettingsMetadataEditor extends MetadataEditor {
  _settings: ISettingRegistry.ISettings;

  constructor(options: any) {
    super(options);
  }

  get settings(): any {
    return this._settings;
  }
  set settings(newSettings: any) {
    this._settings = newSettings;
    void this.initializeMetadata();
  }

  async initializeMetadata() {
    if (!this._settings) {
      console.log('No settings');
      return;
    }
    try {
      const settings = this._settings.schema;
      const schema = {
        display_name: settings.description,
        properties: {
          metadata: {
            properties: {} as any,
            required: []
          }
        },
        required: [],
        title: settings.description,
        uihints: {
          icon: settings['jupyter.lab.setting-icon'],
          reference_url: '',
          title: settings.description
        }
      };
      if (settings.properties) {
        for (const prop in settings.properties) {
          const options = settings.properties[prop];
          schema.properties.metadata.properties[prop] = {
            title: options.title,
            type: 'string',
            uihints: {}
          };
        }
      }
      this.schema = schema.properties.metadata.properties;
      this.referenceURL = schema.uihints?.reference_url;
      this.schemaDisplayName = schema.title;
      this.requiredFields = schema.properties.metadata.required;
      if (!this.name) {
        this.title.label = `New ${this.schemaDisplayName}`;
      }
      // Find categories of all schema properties
      this.schemaPropertiesByCategory = { _noCategory: [] };
      for (const schemaProperty in this.schema) {
        const category =
          this.schema[schemaProperty].uihints &&
          this.schema[schemaProperty].uihints.category;
        if (!category) {
          this.schemaPropertiesByCategory['_noCategory'].push(schemaProperty);
        } else if (this.schemaPropertiesByCategory[category]) {
          this.schemaPropertiesByCategory[category].push(schemaProperty);
        } else {
          this.schemaPropertiesByCategory[category] = [schemaProperty];
        }
      }
    } catch (error) {
      console.log(error);
    }

    if (this.name) {
      for (const metadata of this.allMetadata) {
        if (metadata.metadata.tags) {
          for (const tag of metadata.metadata.tags) {
            if (!this.allTags.includes(tag)) {
              this.allTags.push(tag);
            }
          }
        } else {
          metadata.metadata.tags = [];
        }
        if (this.name === metadata.name) {
          this.metadata = metadata['metadata'];
          this.displayName = metadata['display_name'];
          this.title.label = this.displayName ?? '';
        }
      }
    } else {
      this.displayName = '';
    }

    this.update();
  }

  saveMetadata() {
    console.log('save');
  }
}
