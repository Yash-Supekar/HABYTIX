package com.habytix.habytix_backend.controller;

import com.habytix.habytix_backend.entity.Ticket;
import com.habytix.habytix_backend.entity.TicketStatus;
import com.habytix.habytix_backend.repository.TicketRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "*")
public class TicketController {

    private final TicketRepository ticketRepository;

    public TicketController(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    // ================= TENANT =================

    @PostMapping
    public Ticket createTicket(@RequestBody Ticket ticket) {
        if (ticket.getTenantId() == null) {
            throw new RuntimeException("Tenant ID is required");
        }
        return ticketRepository.save(ticket);
    }

    @GetMapping("/tenant/{tenantId}")
    public List<Ticket> getTicketsByTenant(@PathVariable Long tenantId) {
        return ticketRepository.findByTenantId(tenantId);
    }

    // ================= COMMON =================

    @GetMapping("/{id}")
    public Ticket getTicketById(@PathVariable Long id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
    }

    // ================= MANAGER =================

    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAllOrdered();
    }


    @PutMapping("/{id}/status")
    public Ticket updateStatus(@PathVariable Long id, @RequestParam TicketStatus status) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        ticket.setStatus(status);
        return ticketRepository.save(ticket);
    }

    @PutMapping("/{id}/assign")
    public Ticket assignTicket(@PathVariable Long id, @RequestParam Long staffId) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        ticket.setAssignedTo(staffId);
        ticket.setStatus(TicketStatus.IN_PROGRESS);
        return ticketRepository.save(ticket);
    }

    @PutMapping("/{id}/close")
    public Ticket closeTicket(@PathVariable Long id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        ticket.setStatus(TicketStatus.CLOSED);
        return ticketRepository.save(ticket);
    }

    // ================= DASHBOARD STATS =================

    @GetMapping("/stats")
    public Map<String, Long> getTicketStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("total", ticketRepository.count());
        stats.put("open", ticketRepository.countByStatus(TicketStatus.OPEN));
        stats.put("inProgress", ticketRepository.countByStatus(TicketStatus.IN_PROGRESS));
        stats.put("closed", ticketRepository.countByStatus(TicketStatus.CLOSED));
        return stats;
    }

    @GetMapping("/stats/tenant/{tenantId}")
    public Map<String, Long> getTenantTicketStats(@PathVariable Long tenantId) {
        Map<String, Long> stats = new HashMap<>();
        stats.put("total", ticketRepository.countByTenantId(tenantId));
        stats.put("open", ticketRepository.countByTenantIdAndStatus(tenantId, TicketStatus.OPEN));
        stats.put("inProgress", ticketRepository.countByTenantIdAndStatus(tenantId, TicketStatus.IN_PROGRESS));
        stats.put("closed", ticketRepository.countByTenantIdAndStatus(tenantId, TicketStatus.CLOSED));
        return stats;
    }

    // ================= STAFF =================

    @GetMapping("/staff/{staffId}")
    public List<Ticket> getTicketsForStaff(@PathVariable Long staffId) {
        return ticketRepository.findByAssignedTo(staffId);
    }

    @PutMapping("/{id}/staff/status")
    public Ticket staffUpdateStatus(@PathVariable Long id, @RequestParam TicketStatus status) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        ticket.setStatus(status);
        return ticketRepository.save(ticket);
    }

    @PutMapping("/{ticketId}/assign/{staffId}")
    public Ticket assignTicketToStaff(
            @PathVariable Long ticketId,
            @PathVariable Long staffId
    ) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        ticket.setAssignedTo(staffId);
        ticket.setStatus(TicketStatus.IN_PROGRESS);

        return ticketRepository.save(ticket);
    }

    @GetMapping("/staff/{staffId}/stats")
    public Map<String, Long> getStaffStats(@PathVariable Long staffId) {

        List<Ticket> tickets = ticketRepository.findByAssignedTo(staffId);

        long total = tickets.size();
        long active = tickets.stream()
                .filter(t -> t.getStatus() != TicketStatus.CLOSED)
                .count();
        long closed = tickets.stream()
                .filter(t -> t.getStatus() == TicketStatus.CLOSED)
                .count();

        Map<String, Long> stats = new HashMap<>();
        stats.put("total", total);
        stats.put("active", active);
        stats.put("closed", closed);

        return stats;
    }
}
