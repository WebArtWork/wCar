export const carplaceFormComponents = {
	formId: 'carplace',
	title: 'Carplace',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill carplace title',
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
					value: 'fill carplace description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
