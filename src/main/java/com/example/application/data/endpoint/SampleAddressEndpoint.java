package com.example.application.data.endpoint;

import com.example.application.data.entity.SampleAddress;
import com.example.application.data.service.SampleAddressService;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import java.util.Optional;
import java.util.UUID;
import javax.annotation.security.PermitAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Endpoint
@PermitAll
public class SampleAddressEndpoint {

    private SampleAddressService service;

    public SampleAddressEndpoint(@Autowired SampleAddressService service) {
        this.service = service;
    }

    @Nonnull
    public Page<@Nonnull SampleAddress> list(Pageable page) {
        return service.list(page);
    }

    public Optional<SampleAddress> get(@Nonnull UUID id) {
        return service.get(id);
    }

    @Nonnull
    public SampleAddress update(@Nonnull SampleAddress entity) {
        return service.update(entity);
    }

    public void delete(@Nonnull UUID id) {
        service.delete(id);
    }

    public int count() {
        return service.count();
    }

}
