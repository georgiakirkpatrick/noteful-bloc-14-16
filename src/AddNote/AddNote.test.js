import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AddNote from './AddNote'

describe(`AddNote component`, () => {
//   const props = {
//     folder: {
//       "name": "Important"
//     }
//   }

  it('renders a .AddNote by default', () => {
    const wrapper = shallow(<AddNote />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

//   it('renders a h3 with folder name when in props', () => {
//     const h3 = shallow(<NotePageNav {...props} />)
//       .find('.NotePageNav__folder-name')
//     expect(toJson(h3)).toMatchSnapshot()
//   })
})