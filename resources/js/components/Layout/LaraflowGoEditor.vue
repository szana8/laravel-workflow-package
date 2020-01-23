<template>
	<div>
		<slot name="editor-dialogs"></slot>

		<div class="row mt-5">
			<div class="col-md-12">
				<slot name="editor-messages"></slot>
			</div>

			<div class="col-md-12">
				<div class="card">
					<div class="card-header">
                        <slot name="editor-header"></slot>
                    </div>
                    <div class="card-body">
                    	<div class="row">
                    	<slot name="editor-body"></slot>
                    	</div>
                    </div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		//
	}
</script>
