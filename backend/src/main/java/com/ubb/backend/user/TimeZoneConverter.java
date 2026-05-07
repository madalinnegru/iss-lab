package com.ubb.backend.user;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.TimeZone;

@Converter(autoApply = true)
public class TimeZoneConverter implements AttributeConverter<TimeZone, String> {

    @Override
    public String convertToDatabaseColumn(TimeZone timeZone) {
        return timeZone != null ? timeZone.getID() : null;
    }

    @Override
    public TimeZone convertToEntityAttribute(String s) {
        return s != null ? TimeZone.getTimeZone(s) : null;
    }
}
