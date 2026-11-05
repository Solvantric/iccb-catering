import { mockStore } from "./mockStore";

interface MockResponse {
  status: number;
  data: any;
}

export async function handleMockRequest(
  method: string,
  url: string,
  data?: any,
  params?: any
): Promise<MockResponse> {
  // Artificial latency for realism
  await new Promise((r) => setTimeout(r, 150));

  const cleanUrl = url.split("?")[0].replace(/^\/api/, "");
  const upperMethod = method.toUpperCase();

  // /leads
  if (cleanUrl === "/leads" || cleanUrl.startsWith("/leads/")) {
    const leads = mockStore.getLeads();
    const parts = cleanUrl.split("/").filter(Boolean);

    if (upperMethod === "GET") {
      if (parts.length === 2 && parts[1] !== "pipeline") {
        const found = leads.find((l) => l.id === parts[1]);
        if (found) return { status: 200, data: found };
        return { status: 404, data: { message: "Lead not found" } };
      }
      let filtered = [...leads];
      if (params?.status && params.status !== "All") {
        filtered = filtered.filter((l) => l.status === params.status);
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter((l) => l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q));
      }
      return { status: 200, data: filtered };
    }

    if (upperMethod === "POST") {
      const newLead = {
        ...data,
        id: "lead-" + Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: data.status || "New",
        notes: data.notes || [],
        activities: [
          {
            id: "act-" + Date.now(),
            type: "create",
            description: "Lead created",
            timestamp: new Date().toISOString(),
            user: "Online Visitor / User",
          },
        ],
      };
      leads.unshift(newLead);
      mockStore.saveLeads(leads);
      mockStore.logAction("CREATE", "Leads", `Created lead for ${newLead.name}`);
      return { status: 201, data: newLead };
    }

    if (upperMethod === "PUT" || upperMethod === "PATCH") {
      const id = parts[1];
      const index = leads.findIndex((l) => l.id === id);
      if (index !== -1) {
        leads[index] = { ...leads[index], ...data, updatedAt: new Date().toISOString() };
        mockStore.saveLeads(leads);
        mockStore.logAction("UPDATE", "Leads", `Updated lead ${id}`);
        return { status: 200, data: leads[index] };
      }
      return { status: 404, data: { message: "Lead not found" } };
    }

    if (upperMethod === "DELETE") {
      const id = parts[1];
      const filtered = leads.filter((l) => l.id !== id);
      mockStore.saveLeads(filtered);
      mockStore.logAction("DELETE", "Leads", `Deleted lead ${id}`);
      return { status: 200, data: { success: true } };
    }
  }

  // /menu
  if (cleanUrl === "/menu" || cleanUrl.startsWith("/menu/")) {
    const menu = mockStore.getMenu();
    const parts = cleanUrl.split("/").filter(Boolean);

    if (upperMethod === "GET") {
      if (parts.length === 2) {
        const found = menu.find((m) => m.id === parts[1] || m.slug === parts[1]);
        if (found) return { status: 200, data: found };
        return { status: 404, data: { message: "Menu item not found" } };
      }
      let filtered = [...menu];
      if (params?.category && params.category !== "All") {
        filtered = filtered.filter((m) => m.category.toLowerCase() === params.category.toLowerCase());
      }
      if (params?.cuisine && params.cuisine !== "All") {
        filtered = filtered.filter((m) => m.cuisine.toLowerCase() === params.cuisine.toLowerCase());
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter((m) => m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q));
      }
      return { status: 200, data: filtered };
    }

    if (upperMethod === "POST") {
      const newItem = {
        ...data,
        id: "item-" + Date.now(),
        slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        isSample: true,
      };
      menu.unshift(newItem);
      mockStore.saveMenu(menu);
      mockStore.logAction("CREATE", "Menu", `Added dish ${newItem.name}`);
      return { status: 201, data: newItem };
    }

    if (upperMethod === "PUT" || upperMethod === "PATCH") {
      const id = parts[1];
      const index = menu.findIndex((m) => m.id === id);
      if (index !== -1) {
        menu[index] = { ...menu[index], ...data };
        mockStore.saveMenu(menu);
        mockStore.logAction("UPDATE", "Menu", `Updated dish ${menu[index].name}`);
        return { status: 200, data: menu[index] };
      }
      return { status: 404, data: { message: "Item not found" } };
    }

    if (upperMethod === "DELETE") {
      const id = parts[1];
      const filtered = menu.filter((m) => m.id !== id);
      mockStore.saveMenu(filtered);
      mockStore.logAction("DELETE", "Menu", `Deleted dish ${id}`);
      return { status: 200, data: { success: true } };
    }
  }

  // /quotations
  if (cleanUrl === "/quotations" || cleanUrl.startsWith("/quotations/")) {
    const quots = mockStore.getQuotations();
    const parts = cleanUrl.split("/").filter(Boolean);

    if (upperMethod === "GET") {
      if (parts.length === 2) {
        const found = quots.find((q) => q.id === parts[1]);
        if (found) return { status: 200, data: found };
        return { status: 404, data: { message: "Quotation not found" } };
      }
      return { status: 200, data: quots };
    }

    if (upperMethod === "POST") {
      const newQuot = {
        ...data,
        id: "quot-" + Date.now(),
        quotationNumber: "QT-2026-" + Math.floor(1000 + Math.random() * 9000),
        createdAt: new Date().toISOString(),
        version: 1,
        isSample: true,
      };
      quots.unshift(newQuot);
      mockStore.saveQuotations(quots);
      mockStore.logAction("CREATE", "Quotations", `Generated quotation ${newQuot.quotationNumber}`);
      return { status: 201, data: newQuot };
    }

    if (upperMethod === "PUT" || upperMethod === "PATCH") {
      const id = parts[1];
      const idx = quots.findIndex((q) => q.id === id);
      if (idx !== -1) {
        quots[idx] = { ...quots[idx], ...data, version: (quots[idx].version || 1) + 1 };
        mockStore.saveQuotations(quots);
        mockStore.logAction("UPDATE", "Quotations", `Updated quotation ${id}`);
        return { status: 200, data: quots[idx] };
      }
      return { status: 404, data: { message: "Quotation not found" } };
    }

    if (upperMethod === "DELETE") {
      const id = parts[1];
      const filtered = quots.filter((q) => q.id !== id);
      mockStore.saveQuotations(filtered);
      mockStore.logAction("DELETE", "Quotations", `Deleted quotation ${id}`);
      return { status: 200, data: { success: true } };
    }
  }

  // /bookings
  if (cleanUrl === "/bookings" || cleanUrl.startsWith("/bookings/")) {
    const bookings = mockStore.getBookings();
    const parts = cleanUrl.split("/").filter(Boolean);

    if (upperMethod === "GET") {
      if (parts.length === 2) {
        const found = bookings.find((b) => b.id === parts[1]);
        if (found) return { status: 200, data: found };
        return { status: 404, data: { message: "Booking not found" } };
      }
      return { status: 200, data: bookings };
    }

    if (upperMethod === "POST") {
      const newBooking = {
        ...data,
        id: "bkg-" + Date.now(),
        bookingNumber: "BKG-2026-" + Math.floor(100 + Math.random() * 900),
        createdAt: new Date().toISOString(),
        isSample: true,
      };
      bookings.unshift(newBooking);
      mockStore.saveBookings(bookings);
      mockStore.logAction("CREATE", "Bookings", `Created booking ${newBooking.bookingNumber}`);
      return { status: 201, data: newBooking };
    }

    if (upperMethod === "PUT" || upperMethod === "PATCH") {
      const id = parts[1];
      const idx = bookings.findIndex((b) => b.id === id);
      if (idx !== -1) {
        bookings[idx] = { ...bookings[idx], ...data };
        mockStore.saveBookings(bookings);
        mockStore.logAction("UPDATE", "Bookings", `Updated booking ${id}`);
        return { status: 200, data: bookings[idx] };
      }
      return { status: 404, data: { message: "Booking not found" } };
    }

    if (upperMethod === "DELETE") {
      const id = parts[1];
      const filtered = bookings.filter((b) => b.id !== id);
      mockStore.saveBookings(filtered);
      mockStore.logAction("DELETE", "Bookings", `Deleted booking ${id}`);
      return { status: 200, data: { success: true } };
    }
  }

  // /packages
  if (cleanUrl === "/packages") {
    return { status: 200, data: mockStore.getPackages() };
  }

  // /services
  if (cleanUrl === "/services") {
    return { status: 200, data: mockStore.getServices() };
  }

  // /blog
  if (cleanUrl === "/blog" || cleanUrl.startsWith("/blog/")) {
    const blog = mockStore.getBlog();
    const parts = cleanUrl.split("/").filter(Boolean);

    if (upperMethod === "GET") {
      if (parts.length === 2) {
        const found = blog.find((b) => b.id === parts[1] || b.slug === parts[1]);
        if (found) return { status: 200, data: found };
        return { status: 404, data: { message: "Blog not found" } };
      }
      return { status: 200, data: blog };
    }

    if (upperMethod === "POST") {
      const newPost = {
        ...data,
        id: "blog-" + Date.now(),
        slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        publishedAt: new Date().toISOString().split("T")[0],
        isSample: true,
      };
      blog.unshift(newPost);
      mockStore.saveBlog(blog);
      mockStore.logAction("CREATE", "Blog", `Created blog post ${newPost.title}`);
      return { status: 201, data: newPost };
    }

    if (upperMethod === "DELETE") {
      const id = parts[1];
      const filtered = blog.filter((b) => b.id !== id);
      mockStore.saveBlog(filtered);
      return { status: 200, data: { success: true } };
    }
  }

  // /testimonials
  if (cleanUrl === "/testimonials" || cleanUrl.startsWith("/testimonials/")) {
    const testimonials = mockStore.getTestimonials();
    const parts = cleanUrl.split("/").filter(Boolean);

    if (upperMethod === "GET") {
      return { status: 200, data: testimonials };
    }
    if (upperMethod === "POST") {
      const newTestimonial = {
        ...data,
        id: "test-" + Date.now(),
        isSample: true,
      };
      testimonials.unshift(newTestimonial);
      mockStore.saveTestimonials(testimonials);
      mockStore.logAction("CREATE", "Testimonials", `Added testimonial from ${newTestimonial.clientName}`);
      return { status: 201, data: newTestimonial };
    }
    if (upperMethod === "PUT" || upperMethod === "PATCH") {
      const id = parts[1];
      const idx = testimonials.findIndex((t) => t.id === id);
      if (idx !== -1) {
        testimonials[idx] = { ...testimonials[idx], ...data };
        mockStore.saveTestimonials(testimonials);
        mockStore.logAction("UPDATE", "Testimonials", `Updated testimonial ${id}`);
        return { status: 200, data: testimonials[idx] };
      }
      return { status: 404, data: { message: "Testimonial not found" } };
    }
    if (upperMethod === "DELETE") {
      const id = parts[1];
      const filtered = testimonials.filter((t) => t.id !== id);
      mockStore.saveTestimonials(filtered);
      mockStore.logAction("DELETE", "Testimonials", `Deleted testimonial ${id}`);
      return { status: 200, data: { success: true } };
    }
  }

  // /faqs
  if (cleanUrl === "/faqs" || cleanUrl.startsWith("/faqs/")) {
    const faqs = mockStore.getFaqs();
    const parts = cleanUrl.split("/").filter(Boolean);

    if (upperMethod === "GET") {
      return { status: 200, data: faqs };
    }
    if (upperMethod === "POST") {
      const newFaq = {
        ...data,
        id: "faq-" + Date.now(),
        isSample: true,
      };
      faqs.push(newFaq);
      mockStore.saveFaqs(faqs);
      mockStore.logAction("CREATE", "FAQs", `Created FAQ: ${newFaq.question}`);
      return { status: 201, data: newFaq };
    }
    if (upperMethod === "PUT" || upperMethod === "PATCH") {
      const id = parts[1];
      const idx = faqs.findIndex((f) => f.id === id);
      if (idx !== -1) {
        faqs[idx] = { ...faqs[idx], ...data };
        mockStore.saveFaqs(faqs);
        mockStore.logAction("UPDATE", "FAQs", `Updated FAQ ${id}`);
        return { status: 200, data: faqs[idx] };
      }
      return { status: 404, data: { message: "FAQ not found" } };
    }
    if (upperMethod === "DELETE") {
      const id = parts[1];
      const filtered = faqs.filter((f) => f.id !== id);
      mockStore.saveFaqs(filtered);
      mockStore.logAction("DELETE", "FAQs", `Deleted FAQ ${id}`);
      return { status: 200, data: { success: true } };
    }
  }

  // /gallery
  if (cleanUrl === "/gallery" || cleanUrl.startsWith("/gallery/")) {
    const gallery = mockStore.getGallery();
    const parts = cleanUrl.split("/").filter(Boolean);

    if (upperMethod === "GET") {
      return { status: 200, data: gallery };
    }
    if (upperMethod === "POST") {
      const newItem = {
        ...data,
        id: "gal-" + Date.now(),
      };
      gallery.unshift(newItem);
      mockStore.saveGallery(gallery);
      mockStore.logAction("CREATE", "Gallery", `Added photo ${newItem.title}`);
      return { status: 201, data: newItem };
    }
    if (upperMethod === "DELETE") {
      const id = parts[1];
      const filtered = gallery.filter((g) => g.id !== id);
      mockStore.saveGallery(filtered);
      mockStore.logAction("DELETE", "Gallery", `Deleted photo ${id}`);
      return { status: 200, data: { success: true } };
    }
  }

  // /audit-logs
  if (cleanUrl === "/audit-logs") {
    return { status: 200, data: mockStore.getAuditLogs() };
  }

  // /settings
  if (cleanUrl === "/settings") {
    if (upperMethod === "GET") {
      return { status: 200, data: mockStore.getSettings() };
    }
    if (upperMethod === "PUT" || upperMethod === "POST") {
      mockStore.saveSettings(data);
      mockStore.logAction("UPDATE", "Settings", "Updated site settings");
      return { status: 200, data };
    }
  }

  // /users
  if (cleanUrl === "/users" || cleanUrl.startsWith("/users/")) {
    const users = mockStore.getUsers();
    const parts = cleanUrl.split("/").filter(Boolean);

    if (upperMethod === "GET") {
      return { status: 200, data: users };
    }
    if (upperMethod === "POST") {
      const newUser = {
        ...data,
        id: "usr-" + Date.now(),
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      mockStore.saveUsers(users);
      mockStore.logAction("CREATE", "Users", `Added user ${newUser.name}`);
      return { status: 201, data: newUser };
    }
    if (upperMethod === "PUT" || upperMethod === "PATCH") {
      const id = parts[1];
      const idx = users.findIndex((u) => u.id === id);
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...data };
        mockStore.saveUsers(users);
        mockStore.logAction("UPDATE", "Users", `Updated user ${id}`);
        return { status: 200, data: users[idx] };
      }
      return { status: 404, data: { message: "User not found" } };
    }
    if (upperMethod === "DELETE") {
      const id = parts[1];
      const filtered = users.filter((u) => u.id !== id);
      mockStore.saveUsers(filtered);
      mockStore.logAction("DELETE", "Users", `Deleted user ${id}`);
      return { status: 200, data: { success: true } };
    }
  }

  return { status: 200, data: { message: "Mock endpoint acknowledged" } };
}
