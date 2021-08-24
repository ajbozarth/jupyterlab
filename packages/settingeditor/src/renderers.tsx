import React from 'react';

import { FormControlLabel, InputLabel, Switch } from '@material-ui/core';

import { ArrayInput, DropDown, TextInput } from '@jupyterlab/formeditor';
import { SettingEditorRegistry } from './SettingEditorRegistry';

export const renderDropdown = (
  props: SettingEditorRegistry.IRendererProps
): any => {
  return (
    <DropDown
      label={props.uihints.title}
      key={`${props.uihints.title?.replace(' ', '')}DropDown`}
      description={props.uihints.description}
      defaultError={props.uihints.error ?? ''}
      placeholder={props.uihints.placeholder}
      defaultValue={props.uihints.default}
      readonly={props.uihints.enum !== undefined}
      initialValue={props.value}
      options={props.uihints.enum}
      onChange={(value: any): void => {
        props.handleChange(value);
      }}
    />
  );
};

export const renderTextInput = (
  props: SettingEditorRegistry.IRendererProps
): any => {
  return (
    <TextInput
      label={props.uihints.title}
      description={props.uihints.description}
      key={`${props.uihints.title?.replace(' ', '')}TextInput`}
      fieldName={props.uihints.title?.replace(' ', '')}
      numeric={props.uihints.field_type === 'number'}
      defaultValue={props.value || props.uihints.default || ''}
      secure={props.uihints.secure}
      defaultError={props.uihints.error}
      placeholder={props.uihints.placeholder}
      onChange={(value: any): void => {
        props.handleChange(value);
      }}
    />
  );
};

export const renderCheckbox = (
  props: SettingEditorRegistry.IRendererProps
): any => {
  return (
    <div
      className="jp-metadataEditor-formInput"
      key={`${props.uihints.title?.replace(' ', '')}BooleanInput`}
    >
      <FormControlLabel
        className="jp-metadataEditor-formInput"
        key={`${props.uihints.title?.replace(' ', '')}BooleanInput`}
        control={
          <Switch
            checked={props.value}
            onChange={(e: any, checked: boolean) => {
              props.handleChange(checked);
            }}
          />
        }
        label={props.uihints.title}
      />
    </div>
  );
};

export const renderStringArray = (
  props: SettingEditorRegistry.IRendererProps
): any => {
  return (
    <div
      className="jp-metadataEditor-formInput"
      key={`${props.uihints.title?.replace(' ', '')}Array`}
      style={{ flexBasis: '100%' }}
    >
      <InputLabel> {props.uihints.title} </InputLabel>
      <ArrayInput
        onChange={(values: string[]) => {
          props.handleChange(values);
        }}
        values={props.value ?? ([] as string[])}
      />
    </div>
  );
};
