CREATE TABLE medication_schedule
(
    id            UUID NOT NULL,
    user_id       UUID NOT NULL,
    medication_id UUID NOT NULL,
    CONSTRAINT pk_medication_schedule PRIMARY KEY (id)
);

CREATE TABLE medications
(
    id   UUID         NOT NULL,
    name VARCHAR(255) NOT NULL,
    CONSTRAINT pk_medications PRIMARY KEY (id)
);

CREATE TABLE schedule_times
(
    schedule_id UUID                   NOT NULL,
    time        time WITHOUT TIME ZONE NOT NULL
);

CREATE TABLE users
(
    id        UUID NOT NULL,
    name      VARCHAR(255),
    email     VARCHAR(255),
    password  VARCHAR(255),
    time_zone VARCHAR(255),
    CONSTRAINT pk_users PRIMARY KEY (id)
);

ALTER TABLE medication_schedule
    ADD CONSTRAINT FK_MEDICATION_SCHEDULE_ON_MEDICATION FOREIGN KEY (medication_id) REFERENCES medications (id);

ALTER TABLE medication_schedule
    ADD CONSTRAINT FK_MEDICATION_SCHEDULE_ON_USER FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE schedule_times
    ADD CONSTRAINT fk_schedule_times_on_medication_schedule FOREIGN KEY (schedule_id) REFERENCES medication_schedule (id);