import React, { useState } from "react";
import {
  Table,
  Label,
  Icon,
  Container,
  Form,
  Header,
  Divider,
} from "semantic-ui-react";
import SearchComponent from "./Search";

export default function PolicyGen({ dataMap }) {
  const [service, setService] = useState("");
  const [actions, setActions] = useState([]);

  const updateServiceSelection = (serviceSelection) => {
    if (Object.prototype.hasOwnProperty.call(serviceSelection, "title")) {
      setService(serviceSelection.title);
    } else {
      setService("");
    }
  };

  const updateActionSelections = (actionSelections) => {
    setActions((oldActions) => [...oldActions, actionSelections]);
  };

  const selectAWSActionsHeader = () => {
    if (service === "") {
      return null;
    }
    return (
      <Header as="h3">
        <Icon name="setting" />
        <Header.Content>Step 2: Select AWS Actions</Header.Content>
      </Header>
    );
  };

  const getLabel = (accessLevel) => {
    let labelForAccess;
    switch (accessLevel) {
      case "Write":
        labelForAccess = (
          <Label as="a" color="orange" horizontal>
            Write
          </Label>
        );
        break;
      case "Read":
        labelForAccess = (
          <Label as="a" color="green" horizontal>
            Read
          </Label>
        );
        break;
      case "List":
        labelForAccess = (
          <Label as="a" color="teal" horizontal>
            List
          </Label>
        );
        break;
      case "Tagging":
        labelForAccess = (
          <Label as="a" color="blue" horizontal>
            Tagging
          </Label>
        );
        break;
      case "Permissions management":
        labelForAccess = (
          <Label as="a" color="red" horizontal>
            Permissions Management
          </Label>
        );
        break;
      default:
        labelForAccess = (
          <Label as="a" horizontal>
            Unknown
          </Label>
        );
    }
    return labelForAccess;
  };

  const actionsRenderer = ({ title, description, accessLevel }) => (
    <div>
      <Header as="h4">
        <Header.Content>
          {title}
          {getLabel(accessLevel)}
        </Header.Content>
        <Header.Subheader>{description}</Header.Subheader>
      </Header>
    </div>
  );

  const selectAWSActionsContent = () => {
    if (service === "") {
      return null;
    }
    return (
      <SearchComponent
        label="Select AWS Actions"
        required
        options={dataMap.get(service).privileges}
        updateParent={updateActionSelections}
        resultRenderer={actionsRenderer}
      />
    );
  };

  const selectedActions = () => {
    if (service === "" || actions.length === 0) {
      return null;
    }
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Privilege</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {actions.map((item) => (
            <Table.Row>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>{getLabel(item.accessLevel)}</Table.Cell>
              <Table.Cell>{item.description}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  };

  return (
    <Container>
      <Form>
        <Header as="h3">
          <Icon name="setting" />
          <Header.Content>Step 1: Select AWS Service</Header.Content>
        </Header>
        <SearchComponent
          label="Select AWS Service"
          required
          options={dataMap.get("__services")}
          updateParent={updateServiceSelection}
        />
        <Divider />
        {selectAWSActionsHeader()}
        {selectAWSActionsContent()}
        {selectedActions()}
      </Form>
    </Container>
  );
}
