export const carFormComponents = {
	formId: 'car',
	title: 'Car',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill car title',
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
					value: 'fill car description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
