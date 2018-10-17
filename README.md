# gRowing

gRowing is a collection of modules to construct a friendly front-end in web pages.
Every module takes care of an specific job on the page, the ideia behind the modules is make the developer only import what he need.
The current avaiable modules are:

> Accordion

> Forms

> Grid

> Images

> Modal

> Sidebar

> Slides

> Tables

But relax, more are coming

## Use instructions
We have an standart parameter for all the plugins, the autoExecute, his function is to execute everything the js needs to do when we stanciate the class.

### Accordion

#### Html
Here is an exemple of accordion:
```html
<div class="accord-container w-100" id="accordion">
	<div class="accord-group">
		<div class="accord-title first-accord close">
			Title-1
		</div>
		<div class="accord-text hide-accord formatted-text">
			Text-1
		</div>
	</div>
	<div class="accord-group">
		<div class="accord-title open">
			Title-2
		</div>
		<div class="accord-text">
			Text-2
		</div>
	</div>
	<div class="accord-group">
		<div class="accord-title last-accord close">
			Title-3
		</div>
		<div class="accord-text last-text hide-accord">
			Text-3
		</div>
	</div>
</div>
```
#### JavaScript
The accordion, in the moment, has this 3 parameter, target, autoExecute, and onlyOne
> target -> Indicates the mother class of the accordion

> onlyOne -> When one accordion open, the others will close
```js
const accordion = new Accordion({
	target: "#accordion",
	autoExecute: true,
	onlyOne: true
});
```

### Form
The form module has many functionalities inside him;
#### Validations
Make the front validation of the passed fields
###### validations will contain all the validations will be made, the avaiable types are:
- Presence
- MinLength
- MaxLength

The notify field identify an integration with another module, the Notfy :p

```js
const validation = new Validations({
	form: "#form",
	validations: [{
		validationType: "presence",
		fields: ["#name", "#telefone", "#email"]
	}],
	autoExecute: true,
	notify: true,
	notifyId: "#message"
})
```

#### AutoComplete
Allow to pass an array of values, and when a set field is typed, he will be auto fill (with options, obviusly);
Variables will contain the possibles options to the auto complete

```js
const autoComplete = new AutoComplete({
	target: "#country",
	variables: ["Brazil", "USA", "Japan", "England"],
	autoExecute: true
})
```

#### Select
Just to give you the ability to NOT call that, he will stylize all the selects
(yes, make an internal search in the select is in the plans)
```js
    const select = new Select();
```
> FormFormat
A general class that can call all the functionalities, if you call him only whith autoExecute and scope, he will make the appends and prepends
#### JavaScript
```js
const form = new FormFormat({
	scope: "#content",
	autoExecute: true,
	validate: true,
	validation: {
		form: "#form",
		validations: [{
			validationType: "presence",
			fields: ["#name", "#telefone", "#email"]
		}],
		autoExecute: true,
		notify: true,
		notifyId: "#message"
	},
	autoComplete: true,
	autoCompleteVars: {
		target: "#country",
		variables: ["Brazil", "USA", "Japan", "England"],
		autoExecute: true
	},
	select: true
});
```
