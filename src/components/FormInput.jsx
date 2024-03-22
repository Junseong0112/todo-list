import React, { forwardRef } from "react";

class FormInput extends React.Component {
  render() {
    const { name, children, forwardedRef, ...rest } = this.props;
    return (
      <article className="flex flex-col gap-2 my-5">
        <label className="flex gap-2" htmlFor={name}>
          <span className="text-3xl text-ex-red">*</span>
          {children} :
        </label>
        <input
          className="block w-full px-4 mx-auto text-base bg-gray-600 border-none rounded-lg h-14 bg-opacity-10 text-opacity-30"
          type={name}
          name={name}
          required
          placeholder={children}
          ref={forwardedRef}
          {...rest}
        />
      </article>
    );
  }
}

export default forwardRef((props, ref) => (
  <FormInput forwardedRef={ref} {...props} />
));
