package com.habytix.habytix_backend.repository;

import com.habytix.habytix_backend.entity.Ticket;
import com.habytix.habytix_backend.entity.TicketStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    // Existing methods — DO NOT CHANGE
    List<Ticket> findByTenantId(Long tenantId);

    List<Ticket> findByAssignedTo(Long assignedTo);

    long count();

    long countByStatus(TicketStatus status);

    long countByTenantId(Long tenantId);

    long countByTenantIdAndStatus(Long tenantId, TicketStatus status);


    @Query("""
        SELECT t FROM Ticket t
        ORDER BY 
            CASE t.status
                WHEN 'OPEN' THEN 1
                WHEN 'IN_PROGRESS' THEN 2
                WHEN 'CLOSED' THEN 3
            END,
            t.createdAt DESC
    """)
    List<Ticket> findAllOrdered();
}
