/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TextareaHTMLAttributes } from 'react';

interface TextFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function TextField({ label, ...props }: TextFieldProps) {
  return (
    <>
      {label && <label htmlFor={label}>{label}</label>}
      <textarea css={textFieldStyles} id={label} spellCheck={false} {...props} />
    </>
  );
}

const textFieldStyles = css`
  width: 100%;
  padding: 1rem;
  border-radius: 5px;
  min-height: 100px;
  border: 2px solid gray;
`;
