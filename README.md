# llmshowdown

This repository accompanies a public story written for Medium: ["ChatGPT vs Perplexity: An Expo/React Native Code Generation Showdown"](https://medium.com/@elastingbob/chatgpt-vs-perplexity-an-expo-react-native-code-generation-showdown-baa2827acda3).

I gave the same code generation problem to both ChatGPT and Perplexity.

Below is the prompt I used. The results are in the chatgrp and perplexity folders.

In expo/react native, I'm looking to build generic parent/child components where...

- the parent component contains a title, a top section that consists of a single component, then the child component, and then 3 buttons: cancel, save, delete. Save should only be active if any data was changed
- the child component contains a title, an icon to add a new child, a list of the child detail components. To the right of each child detail component would be an edit icon and a delete icon. The edit icon would open a modal to edit the details for a single child detail
- passed to the parent component would be a component for the top section, a child detail component for the child section, a child detail edit component, a data object, some indication of the attribute within the object to use for the child section, a way to perform the save, a way to perform the delete, parent section title, child section title and styles.
- passed to the child component would be a component for the child section,
- note the object will always have an id attribute as will each child detail
- new child ids may be assigned by adding 1 to the current max id of all details
