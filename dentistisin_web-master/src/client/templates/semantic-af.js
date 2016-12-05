Template.afFormGroup_din.helpers({
	skipLabel: function() {
		var self = this;
		var type = AutoForm.getInputType(self.afFieldInputAtts);
		return (self.skipLabel || type === 'boolean-checkbox');
	}
});
