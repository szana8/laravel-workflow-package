<template>
    <div class="dropdown" v-if="isTransition">
        <a class="btn btn-outline-secondary dropdown-toggle btn-sm"
           href="#"
           role="button"
           id="dropdownMenuLink"
           data-toggle="dropdown"
           aria-haspopup="true"
           aria-expanded="false">Move to..</a>

        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a href="#"
               class="dropdown-item"
               v-text="transition.text"
               v-for="transition in issue.possibleTransitions"
               @click="doTransition(transition)" />
        </div>
    </div>
</template>

<script>
    export default {

        props: ['issue'],

        computed: {
            isTransition() {
                return this.issue.possibleTransitions.length != 0;
            }
        },

        methods: {
            doTransition(transition) {
                this.$emit('changed', transition);
            }
        }
    }
</script>
