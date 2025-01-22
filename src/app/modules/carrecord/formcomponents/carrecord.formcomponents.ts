export const carrecordFormComponents = {
	formId: 'carrecord',
	title: 'Carrecord',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill carrecord title',
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
					value: 'fill carrecord description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
