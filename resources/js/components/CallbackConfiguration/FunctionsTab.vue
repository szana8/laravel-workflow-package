<template>
	<div>
		<div class="form-row mt-3">
	        <div class="form-group col-md-11">
	            <label v-text="title"></label>
	            <select class="form-control" v-model="callbackFunction">
	                <option :value="callback.class" :key="callback.name" v-for="callback in callbacks" v-text="callback.name"></option>
	            </select>
	        </div>
	        <div class="form-group col-md-1">
	            <label>Action</label>
	            <button class="btn btn-primary" @click="addFunction">+</button>
	        </div>
	    </div>

	    <div class="row">
	        <div class="col-md-12">
	            <div class="alert alert-info" :key="name" v-for="name in functions">
	                <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="removeFunction(name)">
	                    <span aria-hidden="true">&times;</span>
	                </button>
	                <slot :functionObj="name"></slot>
	            </div>
	        </div>
	    </div>
	</div>
</template>

<script>
	export default {
		props: ['title', 'callbacks', 'availableFunctions'],

		data() {
			return {
				functions: [],
				callbackFunction: null,
			}
		},
		// Watch the availableFunctions changes to reflect the
		// new transition dialog open
		watch: {
			availableFunctions: function(value) {
				this.functions = value;
			}
		},
		// Set the availableFunctions value for the functions array
		mounted() {
			this.functions = this.availableFunctions;
		},

		methods: {
			addFunction() {
				// Add new function to the array
				this.functions.push(this.callbackFunction);
				// than reset the value
                this.callbackFunction = null;
                // and fire a refreshed event for the parrent
                this.$emit('refreshed', this.functions);
			},

			// Remove the selected function from the array
            removeFunction(name) {
            	// Get the index of the function from the array
                let index = this.functions.indexOf(name);
                // if the function exists in the array
                if (index > -1) {
                	// remove from them
                	this.functions.splice(index, 1);
                }
            },
		}
	}
</script>
