## Integration
* Generally very straightforward, integration itself was the easiest part of the exercise
* It wasn't clear from the first read that amount is in cents
* CheckoutForm.js imported early in the process but only provided in the last step -- couldn't do incremental build
* Stripe listen should print the error message that webhook provides
* Finding other event types that need to be handled by webhook wasn't immediate, could be linked from the page

## Suggestions
* A simple, but useful add-on to allow copying snippets of code with a single click
* In each section of stripe docs link to the relevant API documentation -- it would speed up the process of finding required information which is not available from the docs page itself

## Bug
Node code to create a webhook endpoint has an issue. When the JSON body cannot be parsed, the catch statement doesn't have a return. As a result, if the wrong body is provided, that code snippet will throw an error trying to access event.type, because the event is undefined.

Other languages seem to have it.

## Interview
* Providing server + client build scaffolding would save a good amount of time people who aren't node experts
* Steep learning curve for someone with limited node & react experience
* Github repo vs zip upload in greenhouse.io -- confused on delivery method
* It wasn't clear that friction-log needs to be a part of the repo
