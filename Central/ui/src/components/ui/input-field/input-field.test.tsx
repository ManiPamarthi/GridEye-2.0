import { render, screen } from "@testing-library/react";
import { Input } from "./input-field";

describe('test if input field is working', () => {
  it('it should render a text input field', () => {
    render(<Input type="text" value={'text-field'} />);
    expect(screen.getByDisplayValue('text-field')).toBeInTheDocument();
  });
})