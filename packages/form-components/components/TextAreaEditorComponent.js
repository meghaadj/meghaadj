import React, { useRef, useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { sanitize } from "dompurify";
import JoditEditor from "jodit-react";

import { FormContext } from "../DynamicForm";
import createLabel from "../util/createLabel";

const TextAreaEditorComponent = (props) => {
  const { config, updateField } = props;
  const { data, errors, showErrors } = useContext(FormContext);

  const label = createLabel(config);

  const gridWidth = config?.gridWidth || 12;
  const key = config?.key;
  const placeholder = config?.placeholder || "";

  const valueRef = props?.valueRef || data[key];
  const disabled = config?.disabled || false;
  const viewOnly = config?.viewOnly || false;

  let hasError = false;
  let errorMessage = "";
  if (showErrors) {
    hasError = errors[key] ? true : false;
    errorMessage = errors[key];
  }

  const handleTextChange = (content) => {
    const sanitizedContent = sanitize(content, {
      ALLOWED_TAGS: [
        "footer",
        "header",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "hgroup",
        "section",
        "blockquote",
        "div",
        "hr",
        "li",
        "ol",
        "p",
        "ul",
        "a",
        "b",
        "br",
        "em",
        "i",
        "small",
        "span",
        "strong",
        "sub",
        "sup",
        "u",
        "col",
        "table",
        "tbody",
        "td",
        "tfoot",
        "th",
        "thead",
        "tr",
      ],
    });
    updateField(key, sanitizedContent);
  };

  const editor = useRef(null);

  const editorConfig = {
    placeholder: placeholder || "",
    disabled: disabled,
  };

  if (viewOnly) {
    return (
      <Grid item xs={gridWidth}>
        {label}
        <Typography
          dangerouslySetInnerHTML={{
            __html: valueRef,
          }}
        ></Typography>
      </Grid>
    );
  }

  return (
    <Grid item xs={gridWidth}>
      {label}
      <JoditEditor
        ref={editor}
        config={editorConfig}
        value={valueRef}
        onBlur={handleTextChange}
      />
      {hasError && (
        <Grid item xs={12}>
          <Typography variant="body2" color="error">
            {errorMessage}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export { TextAreaEditorComponent };
