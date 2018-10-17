# gRowing

gRowing is a collection of modules to construct a friendly front-end in web pages.
Every module takes care of an specific job on the page, the idea behind the modules is make the developer only import what he need.
The current avaiable modules are:

> Accordion

> Forms

> Mask

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
Here is an example of accordion:
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

All code examples are based on that html, this html has the ideia of how the forms must be construct
```html
<div id="content" >
	<form action="hahah" method="get" id="form">
		<div class="form-row w-100">
			<div class="form-col">
				<label for="country" class="label required">Nome</label>
				<input type="text" placeholder="country" id="country" class="input" autocomplete="new-password">
				<!-- the autocomplete="new-password" is to avoid the chrome options -->
				<div class="error">

				</div>
			</div>
			<div class="form-col">
				<label for="select" class="label">Dono</label>
				<div class="select">
					<select name="">
						<option value="volvo">Volvo</option>
						<option value="saab">Saab</option>
						<option value="mercedes">Mercedes</option>
						<option value="audi">Audi</option>
					</select>
				</div>
				<div class="error">

				</div>
			</div>
		</div>
		<div class="w-100 form-row">
			<div class="form-col">
				<label for="telefone" class="label">Telefone</label>
				<input type="text" placeholder="telefone" id="telefone" class="input">
				<div class="error">

				</div>
			</div>
			<div class="form-col">
				<label for="email" class="label">Email</label>
				<input type="text" placeholder="email" id="email" data-cont="Ok" class="input prepend">
				<div class="error">

				</div>
			</div>
			<div class="form-col">
				<label for="inscreverse" class="label">Inscrever-se</label>
				<label class="switcher">
					<input type="checkbox" checked>
					<span class="slider round"></span>
				</label>
				<div class="error">

				</div>
			</div>
		</div>
		<button type="submit" name="button" class="btn btn-green">Submit</button>
	</form>
</div>
```
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
##### FormFormat
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

### Mask
Yeah boys, we have maks too :p

Well, the mask dont have any style, or css, only the js, so, i will skip the HTML with the classes you need, and focus on the js, is preety simple
First of all, or classic autoExecute, the format is simple, but dont miss judge, he has to be like that, the "0" will be the characterm anything else, we will considerate part of the mask, and the target is in  what field that should be put
```js
const mask = new Mask({
	autoExecute: true,
	format: "(00) 0000-0000",
	target: "#telefone"
});
```

### Grid
