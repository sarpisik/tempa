import generateApiControllers from './api';
import { pageControllers } from './pages';
import { Database } from '@shared/types';

export default function controllers(
    db: Parameters<typeof generateApiControllers>[0]
) {
    const apiControllers = generateApiControllers(db);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return pageControllers.concat(apiControllers);
}
