-- Database: Privados

-- DROP DATABASE "Privados";

CREATE DATABASE "Privados"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Mexico.1252'
    LC_CTYPE = 'Spanish_Mexico.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

COMMENT ON DATABASE "Privados"
    IS 'Base de datos para la practica de IA';

-- Table: public.privado

-- DROP TABLE public.privado;

CREATE TABLE public.privado
(
    id integer NOT NULL DEFAULT nextval('privado_id_seq'::regclass),
    nombre character varying(50) COLLATE pg_catalog."default",
    carne bigint,
    dpi bigint,
    correo character varying(50) COLLATE pg_catalog."default",
    semestre integer,
    anio integer,
    numerogrupo integer,
    CONSTRAINT privado_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.privado
    OWNER to postgres;