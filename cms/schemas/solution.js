export default {
  name: 'solution',
  title: 'Solution',
  type: 'object',
  fields: [
    { title: 'Solution Type', name: 'type', type: 'string', 
      options: {
        list: [
          {title: "Stop Gap", value:"Stop Gap"},
          {title: "Partial", value:"Partial"},
          {title: "Short Term", value:"Short Term"},
          {title: "Long Term", value:"Long Term"},
          {title: "Permanent", value:"Permanent"},
        ]
      }
    },
    { title: 'Cost', name:'cost', type: 'number' },
    { title: 'Year Estimated', name:'estimated', type: 'string',
      description: "If there is no year estimated the cost will be shown as projected" 
    },
    { title: "Work Description", name:"work", type:'array', of:[{type: 'string'}]},
    { title: "Description Of Project", name:"description", type:'string'},
  ],
  preview: {
    select: {
      type: 'type',
      cost: 'cost',
      estimated: 'estimated',
    },
    prepare(selection) {
      const {cost, type, estimated} = selection;
      const preview = {
        title: `${type}: ${cost ? "$"+Intl.NumberFormat("en-US").format(cost) : 'Unknown Cost'}`,
      }
      if (estimated) {
        preview.subtitle = "Estimated in "+estimated
      }
      return preview
    }
  },
}
