<template>
  <laraflow-dialog id="callback-configuration" title=" Callback Configuration" :isLarge="true">
    <template slot="laraflow-dialog-body">
      <tab-headers :tabs="tabs">
        <template slot-scope="{tab}">
          <span style="text-transform: capitalize;">{{tab}}</span>
          <span class="badge badge-secondary">{{ _self[tab.split(' ').join('') + 'Count'] }}</span>
        </template>
      </tab-headers>

      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="validators"
          role="tabpanel"
          aria-labelledby="validators-tab"
        >
          <validators-tab
            v-if="callbackObjects"
            :validators="callbackObjects.validators"
            :availableRules="rules"
            @refreshRule="refreshRule"
          >
            <template slot-scope="{rule}">
              {{ this.callbackObjects.validators[rule[Object.keys(rule)[0]]].name }}: {{ Object.keys(rule)[0] }}
              <br />
              <small>{{ this.callbackObjects.validators[rule[Object.keys(rule)[0]]].description }}</small>
            </template>
          </validators-tab>
        </div>

        <div
          class="tab-pane fade"
          id="prefunctions"
          role="tabpanel"
          aria-labelledby="prefunctions-tab"
        >
          <functions-tab
            v-if="callbackObjects"
            :callbacks="callbackObjects.callbacks"
            :availableFunctions="preFunctions"
            @refreshed="refreshPreFunction"
          >
            <template slot-scope="{functionObj}">
              {{ functionObj }}
              <br />
              <small>{{ this.callbackObjects.callbacks[Object.keys(functionObj)[0]].description }}</small>
            </template>
          </functions-tab>
        </div>
        <div
          class="tab-pane fade"
          id="postfunctions"
          role="tabpanel"
          aria-labelledby="postfunctions-tab"
        >
          <functions-tab
            v-if="callbackObjects"
            :callbacks="callbackObjects.callbacks"
            :availableFunctions="postFunctions"
            @refreshed="refreshPostFunction"
          >
            <template slot-scope="{functionObj}">
              {{ functionObj }}
              <br />
              <small>{{ this.callbackObjects.callbacks[Object.keys(functionObj)[0]].description }}</small>
            </template>
          </functions-tab>
        </div>
      </div>
    </template>

    <template slot="laraflow-dialog-footer">
      <button
        type="button"
        class="btn btn-secondary"
        @click.prevent="cancel"
        data-dismiss="modal"
      >Close</button>
      <button type="button" class="btn btn-primary" @click="save">Save changes</button>
    </template>
  </laraflow-dialog>
</template>

<script>
import { EventBus } from "../../event-bus.js";
import LaraflowDialog from "./LaraflowDialog";
import TabHeaders from "../CallbackConfiguration/TabHeaders";
import FunctionsTab from "../CallbackConfiguration/FunctionsTab";
import ValidatorsTab from "../CallbackConfiguration/ValidatorsTab";

export default {
  components: {
    TabHeaders,
    FunctionsTab,
    ValidatorsTab,
    LaraflowDialog
  },

  data() {
    return {
      tabs: ["validators", "pre functions", "post functions"],
      rules: [],
      diagram: null,
      category: null,
      preFunctions: [],
      postFunctions: [],
      callbackObjects: null
    };
  },

  mounted() {
    // Initialize event handler to show the modal if the event has been fired
    EventBus.$on("showConfigureCallbacksModal", this.show);
  },

  computed: {
    // Return the count of the rules which has been added to the transition
    validatorsCount() {
      return this.rules ? this.rules.length : 0;
    },
    // Return the number of the pre functions which has been added to the transition
    prefunctionsCount() {
      return this.preFunctions ? this.preFunctions.length : 0;
    },
    // Return the number of the post function which has been added to the transition
    postfunctionsCount() {
      return this.postFunctions ? this.postFunctions.length : 0;
    }
  },

  methods: {
    // Show the new callback configuration modal
    show(object, callbacks) {
      // Set the necessary objects
      this.diagram = object;
      this.callbackObjects = callbacks;
      // Get the validators which are belongs to the selected
      // transition
      this.rules = this.diagram.subject.part.data.validators;
      this.preFunctions = this.diagram.subject.part.data.callbacks.pre;
      this.postFunctions = this.diagram.subject.part.data.callbacks.post;
      // open the dialog window
      $("#callback-configuration").modal("show");
    },

    // Reset all of the necessary attributes than close the dialog
    cancel() {
      this.$emit("cancelled");
    },

    // Add new rule to the rule-set array
    refreshRule(rules) {
      this.rules = rules;
    },

    // Add new pre function to the array
    refreshPreFunction(preFunctions) {
      this.preFunctions = preFunctions;
    },

    // Add new pre function to the array
    refreshPostFunction(postFunctions) {
      this.postFunctions = postFunctions;
    },

    // Add the rule set to the appropriate transition
    save() {
      // Set the affacted transtition to all of the
      // callbacks array values
      this.setValidatorProperty();
      this.setPreFunctionsProperty();
      this.setPostFunctionsProperty();
      // than close the dialog window
      $("#callback-configuration").modal("hide");
      // and finally fire an event for the parent component
      this.$emit("configured");
    },

    // Set the validator property of the laraflow model
    setValidatorProperty() {
      window.laraflowGo.model.setDataProperty(
        this.diagram.subject.part.data,
        "validators",
        this.rules
      );
    },

    // Set the pre functions property of the laraflow model
    setPreFunctionsProperty() {
      window.laraflowGo.model.setDataProperty(
        this.diagram.subject.part.data.callbacks,
        "pre",
        this.preFunctions
      );
    },

    // Set the post functions property of the laraflow model
    setPostFunctionsProperty() {
      window.laraflowGo.model.setDataProperty(
        this.diagram.subject.part.data.callbacks,
        "post",
        this.postFunctions
      );
    }
  }
};
</script>
