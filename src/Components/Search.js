import _ from "lodash";
import React, { useState } from "react";
import { Form, Icon, Label, Search } from "semantic-ui-react";

export default function TypeaheadBlockComponent (props) {
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const defaultResultRenderer = ({ title }) => {
        return <Label content={title} />
    }

    const handleResultSelect = (e, { result }) => {
        setSearchValue(result.title);
        props.updateParent(result);
    };

    const handleSearchChange = (e, { value }) => {
        setSearchValue(value);
        setIsLoading(true);
        setTimeout(() => {
        if (value.length < 1) {
            setIsLoading(false);
            setSearchValue("");
            props.updateParent("");
            return;
        }
        const re = new RegExp(_.escapeRegExp(value), "i");
        const isMatch = (result) => re.test(result.title);
        
        setResults(_.filter(props.options, isMatch));
        
        setIsLoading(false);
        }, 300);
    }

    return (
      <Form.Field required={props.required || false}>
        <label>{props.label || "Enter Value"}</label>
        <Search
          fluid
          loading={isLoading}
          onResultSelect={handleResultSelect}
          onSearchChange={handleSearchChange}
          results={results}
          value={searchValue}
          showNoResults={true}
          resultRenderer={props.resultRenderer || defaultResultRenderer}
        />
      </Form.Field>
    );
}
