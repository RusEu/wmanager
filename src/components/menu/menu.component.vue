<style lang="scss" src="./menu.component.scss"></style>
<script lang="ts" src="./menu.component.ts"></script>

<template>
    <div class="container">
        <div class="form-group" v-on:click="onClick()">
            <input ref="value" v-model="value" v-on:click="value = ''" v-on:keyup="keyMonitor"/>
        </div>
        <ul class="menu">
            <li v-for="result of results" :key="result.name" v-bind:class="{ active: result.selected }">
                {{result.name}}
            </li>
        </ul>
    </div>
</template>