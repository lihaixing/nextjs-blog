import { format } from 'date-fns';

export default function Date({ dateString }) {
  return <time>{ format(dateString,'LLLL d, yyyy') } </time>;
}