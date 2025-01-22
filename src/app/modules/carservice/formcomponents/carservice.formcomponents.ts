export const carserviceFormComponents = {
	formId: 'carservice',
	title: 'Carservice',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill carservice title',
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
					value: 'fill carservice description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
