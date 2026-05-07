CREATE TABLE IF NOT EXISTS schedule_times
(
    schedule_id UUID                   NOT NULL,
    time        time WITHOUT TIME ZONE NOT NULL
);

ALTER TABLE schedule_times
    ADD CONSTRAINT fk_schedule_times_on_medication_schedule FOREIGN KEY (schedule_id) REFERENCES medication_schedule (id);

ALTER TABLE medication_schedule
    ALTER COLUMN medication_id SET NOT NULL;

ALTER TABLE medication_schedule
    ALTER COLUMN user_id SET NOT NULL;