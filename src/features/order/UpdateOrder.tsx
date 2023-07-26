import { Params, useFetcher } from 'react-router-dom';
import Button from '../../UI/Button';
import { updatePriorityOrder } from '../../services/apiRestaurant';

function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

type Action = {
  request: Request;
  params: Params;
};

export async function action({ request , params }: Action) {
  const data = { priority: true };
  const id = params.orderId;
  await updatePriorityOrder(id as string, data);
  return null;
}
