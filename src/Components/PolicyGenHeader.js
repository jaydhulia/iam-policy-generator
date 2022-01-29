import React from "react";
import { Divider, Header, Icon } from "semantic-ui-react";

export default function PolicyGenHeader() {
  return (
    <Header as="h2" icon textAlign="center">
      <Icon name="aws" circular />
      <Header.Content>AWS IAM Policy Generator</Header.Content>
      <Header.Subheader>
        A simple generator for IAM Policies for AWS
      </Header.Subheader>
      <Divider />
    </Header>
  );
}
