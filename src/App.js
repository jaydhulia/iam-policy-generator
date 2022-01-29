// import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import "./App.css";
import { Segment, Loader, Dimmer, Grid } from "semantic-ui-react";
import PolicyGen from "./Components/PolicyGen";
import PolicyGenHeader from "./Components/PolicyGenHeader";

function App() {
  const [data, setData] = useState(undefined);
  const [loadedData, setLoadedData] = useState(false);
  // const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("./iam_definition.json");
      const json = await response.json();
      return { success: true, data: json };
    } catch (e) {
      return { success: false };
    }
  };

  useEffect(async () => {
    if (loadedData === true) {
      return;
    }
    setLoadedData(false);
    const res = await fetchData();
    if (res.success) {
      const dataMap = new Map();
      const dataArray = [];
      res.data.forEach((element) => {
        dataMap.set(`${element.prefix} (${element.service_name})`, element);
        dataArray.push({
          title: `${element.prefix} (${element.service_name})`,
        });
      });
      dataMap.set("__services", dataArray);
      setData(dataMap);
    } else {
      // setError(true);
      // TODO: surface error to user
    }
    setLoadedData(true);
  }, []);

  return (
    <div className="App">
      <PolicyGenHeader />
      {loadedData ? (
        <Segment>
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column>
                <PolicyGen dataMap={data} />
              </Grid.Column>
              <Grid.Column>TODO Hello world</Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      ) : (
        <Dimmer active>
          <Loader />
        </Dimmer>
      )}
    </div>
  );
}

export default App;
