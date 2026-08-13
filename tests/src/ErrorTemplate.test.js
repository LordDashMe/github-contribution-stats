const { ErrorTemplate } = require('../../src/ErrorTemplate');

describe('Tests for Error Template.', () => {

  it('should render a valid svg carrying the given message.', () => {

    const template = ErrorTemplate('Something went wrong.');

    expect(template).toContain('<svg');
    expect(template).toContain('</svg>');
    expect(template).toContain('Something went wrong.');

  });

  it('should escape the xml predefined entities in the message.', () => {

    const template = ErrorTemplate(`<script>&"'`);

    expect(template).toContain('&lt;script&gt;&amp;&quot;&apos;');
    expect(template).not.toContain('<script>');

  });

});
