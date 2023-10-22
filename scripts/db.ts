import { DataSource } from 'typeorm';
import config from '../ormconfig';
import { AddBook1659199341084 } from '../src/migrations/1659199341084-AddBook';
import { AddBookGenreJoinTable1659392623618 } from '../src/migrations/1659392623618-AddBookGenreJoinTable';
import { AddGenre1659301081383 } from '../src/migrations/1659301081383-AddGenre';
import { Addporra1659203450918 } from '../src/migrations/1659203450918-Addporra';

(async () => {
  console.log(config);
  const ds = await new DataSource(config).initialize();

  await ds.transaction(async (manager) => {
    const qr = manager.queryRunner;

    await qr.query(`CREATE DATABASE IF NOT EXISTS library`);

    await new AddBook1659199341084().up(qr);

    await new AddGenre1659301081383().up(qr);

    await new Addporra1659203450918().up(qr);

    await new AddBookGenreJoinTable1659392623618().up(qr);

    console.log('done');
    process.exit(1);
  });
})();
