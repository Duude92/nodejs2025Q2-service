import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1748792811146 implements MigrationInterface {
    name = 'Initial1748792811146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "REL_3d06f25148a4a880b429e3bc83" UNIQUE ("artistId"), CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" uuid, "albumId" uuid, "duration" integer NOT NULL, CONSTRAINT "REL_997cfd9e91fd00a363500f72dc" UNIQUE ("artistId"), CONSTRAINT "REL_b105d945c4c185395daca91606" UNIQUE ("albumId"), CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites_artists_artist" ("favoritesId" uuid NOT NULL, "artistId" uuid NOT NULL, CONSTRAINT "PK_a6aeacbfda85e00ccc625a84474" PRIMARY KEY ("favoritesId", "artistId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_663b6278dbd0f67925d1238ade" ON "favorites_artists_artist" ("favoritesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2a44f2a39bd14c72dfd8ad7933" ON "favorites_artists_artist" ("artistId") `);
        await queryRunner.query(`CREATE TABLE "favorites_albums_album" ("favoritesId" uuid NOT NULL, "albumId" uuid NOT NULL, CONSTRAINT "PK_4caba2d65763821c7dd2db51558" PRIMARY KEY ("favoritesId", "albumId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_31b327b5a4f89d2eb722968982" ON "favorites_albums_album" ("favoritesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4ff0c3cde93d2bc8c23c2b72c3" ON "favorites_albums_album" ("albumId") `);
        await queryRunner.query(`CREATE TABLE "favorites_tracks_track" ("favoritesId" uuid NOT NULL, "trackId" uuid NOT NULL, CONSTRAINT "PK_613647698cfa077425b1047e1a6" PRIMARY KEY ("favoritesId", "trackId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3ecf4f6fab33cc9611b9e40292" ON "favorites_tracks_track" ("favoritesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fee451584feed445b14adb7fb8" ON "favorites_tracks_track" ("trackId") `);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_b105d945c4c185395daca91606a" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorites_artists_artist" ADD CONSTRAINT "FK_663b6278dbd0f67925d1238ade2" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_artists_artist" ADD CONSTRAINT "FK_2a44f2a39bd14c72dfd8ad7933b" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_albums_album" ADD CONSTRAINT "FK_31b327b5a4f89d2eb7229689829" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_albums_album" ADD CONSTRAINT "FK_4ff0c3cde93d2bc8c23c2b72c3f" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_tracks_track" ADD CONSTRAINT "FK_3ecf4f6fab33cc9611b9e402927" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_tracks_track" ADD CONSTRAINT "FK_fee451584feed445b14adb7fb80" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites_tracks_track" DROP CONSTRAINT "FK_fee451584feed445b14adb7fb80"`);
        await queryRunner.query(`ALTER TABLE "favorites_tracks_track" DROP CONSTRAINT "FK_3ecf4f6fab33cc9611b9e402927"`);
        await queryRunner.query(`ALTER TABLE "favorites_albums_album" DROP CONSTRAINT "FK_4ff0c3cde93d2bc8c23c2b72c3f"`);
        await queryRunner.query(`ALTER TABLE "favorites_albums_album" DROP CONSTRAINT "FK_31b327b5a4f89d2eb7229689829"`);
        await queryRunner.query(`ALTER TABLE "favorites_artists_artist" DROP CONSTRAINT "FK_2a44f2a39bd14c72dfd8ad7933b"`);
        await queryRunner.query(`ALTER TABLE "favorites_artists_artist" DROP CONSTRAINT "FK_663b6278dbd0f67925d1238ade2"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_b105d945c4c185395daca91606a"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2"`);
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fee451584feed445b14adb7fb8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3ecf4f6fab33cc9611b9e40292"`);
        await queryRunner.query(`DROP TABLE "favorites_tracks_track"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4ff0c3cde93d2bc8c23c2b72c3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_31b327b5a4f89d2eb722968982"`);
        await queryRunner.query(`DROP TABLE "favorites_albums_album"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2a44f2a39bd14c72dfd8ad7933"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_663b6278dbd0f67925d1238ade"`);
        await queryRunner.query(`DROP TABLE "favorites_artists_artist"`);
        await queryRunner.query(`DROP TABLE "favorites"`);
        await queryRunner.query(`DROP TABLE "track"`);
        await queryRunner.query(`DROP TABLE "album"`);
        await queryRunner.query(`DROP TABLE "artist"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
