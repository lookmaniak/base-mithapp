import m from 'mithril'

const TextField = {
  view({
    attrs: {
      label,
      value,
      oninput,
      exception,
      autocomplete = true,
      className = "",
      type = "text",
      icon,
      onkeydown,// NEW: lucide icon name
    }
  }) {
    const id = label.toLowerCase().replaceAll(" ", "-");
    const hasError = !!exception;
    const style = icon ? 
        `
          display: flex;
          align-items: center;
          background: var(--card-bg);
          border: 1px solid var(--bs-border-color);
          border-radius: var(--bs-border-radius);
          padding: 0.35rem 0.75rem;
          gap: .5rem;
          transition: border-color .2s ease;
        ` : ''
          
      return m(".form-group", [

      // Label
      m("label.form-label.fw-semibold.small.mb-1", { for: id }, label),

      // Input wrapper (icon + input)
      m(".input-group.input-group-custom", {

        style: style,

        class: hasError ? "is-invalid border-danger" : "border"
      }, [

        // Left Icon
        icon
          ? m(`i[data-lucide=${icon}]`)
          : null,

        // Real input
        m("input.form-control.border-0.shadow-none", {
          type,
          id,
          autocomplete: autocomplete ? "on" : "off",
          className: className,
          value,
          oninput: e => oninput(e),
          onkeydown: e => onkeydown(e),
          style: `
            background: transparent !important;
            padding-left: 0;
          `
        })
      ]),

      // Error message
      hasError
        ? m("small.invalid-feedback.d-block.mt-1", exception)
        : null
    ]);
  },
}

export default TextField
