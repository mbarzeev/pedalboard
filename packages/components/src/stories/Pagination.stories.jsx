import React from 'react';
import Pagination from '../Pagination';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Pagination',
  component: Pagination,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    onChange:{ action: 'Page changed' },
  },
};



// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <div><Pagination {...args} /></div>;

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {
    totalPages:10,
    initialCursor:3,
    pagesBuffer:5,
};
