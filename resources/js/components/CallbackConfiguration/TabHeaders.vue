<template>
	<ul class="nav nav-tabs" role="tablist">
		<li v-for="(tab, index) in tabs" class="nav-item">
			<a 	:class="[index === 0 ? 'active' : '', 'nav-link']"
				:id="setTabId(tab)"
				:href="setTabLink(tab)"
				:aria-selected="{'true': index === 0}"
				role="tab"
				data-toggle="tab"
				aria-controls="tab">
                <slot :tab="tab">{{index}}</slot>
            </a>
		</li>
	</ul>
</template>

<script>
	export default {
		props: ['tabs'],

		methods: {
			// Set the tab href for the navigation, need to
			// remove the spaces from the string & convert
			// to lowercase
			setTabLink(tab) {
				return '#' + tab.split(' ').join('').toLowerCase();
			},

			// Set the tab id for the tab labels, also need to
			// convert to lowercase and remove the spaces
			setTabId(tab) {
				return tab.split(' ').join('').toLowerCase() + '-tab';
			},
		}
	}
</script>
