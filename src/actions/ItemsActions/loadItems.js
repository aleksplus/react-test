const SAMPLE_DATA= [
  {
    title: 'test 1',
    value: 'test1'
  },
  {
    title: 'test 2',
    value: 'test2'
  },
  {
    title: 'test 3',
    value: 'test3'
  },
];

export default function loadItems(context) {
  context.dispatch('LOAD_ITEMS', SAMPLE_DATA);
}
