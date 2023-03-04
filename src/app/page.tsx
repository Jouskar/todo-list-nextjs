import styles from './page.module.css';
import CreateTask from '../components/CreateTask';
import ListTaskItems from '../components/ListTaskItems';
import PointService from '@/services/service';
import { ToDoResponse } from '@/interface/task';

export default async function Home() {
  const service = new PointService();

  const tasks = await service.fetchGet('/tasks') as ToDoResponse;

  return (
    <>
      <ListTaskItems toDos={tasks?.results}/>
    </>
  )
}

