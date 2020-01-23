<template>
	<div>
		<div class="form-row mt-3">
            <div class="form-group col-md-5">
                <label>Select validator</label>
                <select class="form-control" v-model="rule">
                    <option :value="validator.validator" :key="validator.name" v-for="validator in validators" v-text="validator.name"></option>
                </select>
            </div>
            <div class="form-group col-md-6">
                <label>Select field</label>
                <input type="text" class="form-control" v-model="field"/>
            </div>
            <div class="form-group col-md-1">
                <label>Action</label>
                <button class="btn btn-primary" @click="addRule">+</button>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="alert alert-info" :key="rule[Object.keys(rule)[0]]+Object.keys(rule)[0]" v-for="rule in rules">
                	 <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="removeRule(rule)">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <slot v-bind:rule="rule"></slot>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
	export default {
		props: ['validators', 'availableRules'],

		data() {
			return {
				rules: [],
				rule: null,
				field: null,
			}
		},
        // Watch the availableRules changes to reflect the
        // new transition dialog open
        watch: {
            availableRules: function(value) {
                this.rules = value;
            }
        },
        // Set the availableRules value for the rules array
		mounted() {
			this.rules = this.availableRules;
		},

		methods: {
            // Add the rule object to the rules array and
            // reset the attrributes value
			addRule() {
				let obj = {};
                obj[this.field] = this.rule;
                this.rules.push(obj);
                // Fire a refresh rule event to reflect the
                // parent component the changes
                this.$emit('refreshRule', this.rules);
                this.resetAttributes();
			},
            // Remove the selected rule from the rules array
			removeRule(rule) {
				let key = Object.keys(rule)[0];
                this.rules = this.rules.filter(el => el[key] !== rule[key]);
                // Fire a refresh rule event to reflect the
                // parent component the changes
                this.$emit('refreshRule', this.rules);
			},

			// Reset the attributes value
            resetAttributes() {
                this.rule = null;
                this.field = null;
            }
		}
	}
</script>
