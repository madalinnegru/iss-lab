package com.ubb.backend.user.dto;

import com.ubb.backend.user.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.TimeZone;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "password", ignore = true)
    @Mapping(source = "timeZone", target = "timeZone", qualifiedByName = "timeZoneToString")
    UserDTO toDTO(User entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "timeZone", target = "timeZone", qualifiedByName = "stringToTimeZone")
    User toEntity(UserDTO dto);

    @Named("stringToTimeZone")
    default TimeZone stringToTimeZone(String value) {
        return value != null ? TimeZone.getTimeZone(value) : null;
    }

    @Named("timeZoneToString")
    default String timeZoneToString(TimeZone value) {
        return value != null ? value.getID() : null;
    }
}