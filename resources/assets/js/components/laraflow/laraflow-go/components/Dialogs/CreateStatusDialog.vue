<template>
    <laraflow-dialog id="create-laraflow-status" title="Add Status" :isLarge="false">
        <template slot="laraflow-dialog-body">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Name" v-model="name">
            </div>

            <div class="form-group">
                <label for="category">Category</label>
                <select name="category" id="category" v-model="category" class="form-control">
                    <option selected>Please Choose...</option>
                    <option value="primary">Primary</option>
                    <option value="success">Success</option>
                    <option value="warning">Warning</option>
                    <option value="danger">Danger</option>
                </select>
            </div>
        </template>

        <template slot="laraflow-dialog-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="addStatus">Save changes</button>
        </template>

    </laraflow-dialog>
</template>

<script>
    import { EventBus } from '../../event-bus.js';
    import LaraflowDialog from './LaraflowDialog';

    export default {
        components: {
            LaraflowDialog,
        },

        data() {
            return {
                name: null,
                category: null
            }
        },

        mounted() {
            // Initialize event handler to show the modal if the event has been fired
            EventBus.$on('showCreateWorkflowStatusModal', this.show);
        },

        methods: {
            // Show the new workflow status modal to create
            // a new status.
            show() {
                $("#create-laraflow-status").modal('show');
            },
            // Add the new status of the palette
            addStatus() {
                // Fire a created event to force the parent component
                // to refresh the palette with the given data
                this.$emit('created', this.category, this.name);
               // Hide the workflow status modal
                $("#create-laraflow-status").modal('hide');
                // Set the attributes to null
                $("#create-laraflow-status").on('hidden-bs-modal', () => {
                    this.resetAttributes();
                });
            },
            // Reset the value of the attributes
            resetAttributes() {
                this.name = null;
                this.category = null;
            },
        }

    }
</script>
