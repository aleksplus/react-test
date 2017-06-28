export default function removeItem(context, value) {
  context.dispatch('REMOVE_ITEM', value);
}