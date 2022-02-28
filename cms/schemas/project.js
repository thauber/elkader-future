import client from 'part:@sanity/base/client';

function zeroPad(num, places){
  return String(num).padStart(places, '0');
}

export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { title: 'Project ID', name: 'projectId', type: 'slug', },
    { title: 'Map Image', name: 'map', type: 'image', },
    { title: 'Location', name:'location', type: 'string' },
    { title: 'Sublocation', name:'sublocation', type: 'string' },
    { title: 'Project Type', name:'type', type: 'string' },
    { title: 'Description of Problems', name:'description', type: 'text'},
    { title: 'Notes', name:'notes', type: 'string'},
    { title: 'Solutions', name:'solutions', type: 'array', of:[{type:'solution'}]},
  ],
  preview: {
    select: {
      title: 'projectId.current',
      type: 'type',
      location: 'location',
    },
    prepare(selection) {
      const {title, type, location} = selection;
      return {
        title,
        subtitle: `${type}: ${location}`
      }
    }
  },
  initialValue: async () => ({
    projectId: {current: `CP-${zeroPad((await client.fetch('count(*[_type == "project"])')) + 1, 4)}`}
  })
}
