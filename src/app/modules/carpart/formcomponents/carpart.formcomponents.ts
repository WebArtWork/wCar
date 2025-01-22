export const carpartFormComponents = {
	formId: 'carpart',
	title: 'Carpart',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill carpart title',
				},
				{
					name: 'Label',
					value: 'Title',
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill carpart description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
